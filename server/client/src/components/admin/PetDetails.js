import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`/api/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error('Error fetching pet details:', err);
      }
    };
    fetchPet();
  }, [id]);

  if (!pet) return <p>Loading...</p>;

  //const navigate = useNavigate();
  return (
    <main className='main-content'>
      <div className='pet-detail__grid'>
        <section className='pet-detail__left'>
          <div className='pet-detail__gallery'>
            <figure className='pet-detail__gallery-main'>
              <img src={`http://localhost:4000${pet.image}`} alt={pet.name} />
            </figure>
            {pet.additionalImages && pet.additionalImages.length > 0 && (
              <div className='pet-detail__thumbs'>
                {pet.additionalImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:4000${img}`}
                    alt={`${pet.name} extra ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <ul className='pet-detail__facts'>
            <li title='Gender'>
              {pet.gender === 'male' ? '♂ Male' : '♀ Female'}
            </li>
            <li title='Age'>📅 {pet.age}</li>
            <li title='Status'>✅ {pet.status}</li>
          </ul>

          <p className='pet-detail__desc pet-detail__desc--clamp'>
            {pet.description}
          </p>

          <div className='pet-detail__traits'>
            {pet.traits && pet.traits.length > 0 ? (
              pet.traits.map((trait, index) => (
                <span key={index} className='pet-detail__chip'>
                  {trait}
                </span>
              ))
            ) : (
              <span classNameName='pet-detail__chip'>No traits added</span>
            )}
          </div>
        </section>
        <aside className='pet-detail__right'>
          <div className='pet-detail__sidecard pet-detail__sidecard--cta'>
            <h3>Manage {pet.name}</h3>

            <div className='pet-detail__admin-actions'>
              <button className='edit-btn'>Edit</button>
              <button className='delete-btn'>Delete</button>
            </div>

            <p className='pet-detail__helper'>
              <a href='admin-adoptions.html'>View adoption requests</a>
            </p>
            <p className='pet-detail__helper'>
              <Link to='/admin/pets' className='back-btn'>
                ← Back to Pets
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};
export default PetDetails;
