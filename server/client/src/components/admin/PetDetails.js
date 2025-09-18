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
    <main class='main-content'>
      <div class='pet-detail__grid'>
        <section class='pet-detail__left'>
          <div class='pet-detail__gallery'>
            <figure class='pet-detail__gallery-main'>
              <img src={`http://localhost:4000${pet.image}`} alt={pet.name} />
            </figure>
            {pet.additionalImages && pet.additionalImages.length > 0 && (
              <div class='pet-detail__thumbs'>
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

          <ul class='pet-detail__facts'>
            <li title='Gender'>♂ Male</li>
            <li title='Age'>📅 3 years</li>
            <li title='Status'>✅ Available</li>
          </ul>

          <p class='pet-detail__desc pet-detail__desc--clamp'>
            {pet.description}
          </p>

          <div class='pet-detail__traits'>
            <span class='pet-detail__chip'>Cat-friendly</span>
            <span class='pet-detail__chip'>Kid-safe</span>
            <span class='pet-detail__chip'>House-trained</span>
            <span class='pet-detail__chip'>Leash-trained</span>
          </div>
        </section>
        <aside class='pet-detail__right'>
          <div class='pet-detail__sidecard pet-detail__sidecard--cta'>
            <h3>Manage {pet.name}</h3>

            <div class='pet-detail__admin-actions'>
              <button class='edit-btn'>Edit</button>
              <button class='delete-btn'>Delete</button>
            </div>

            <p class='pet-detail__helper'>
              <a href='admin-adoptions.html'>View adoption requests</a>
            </p>
            <p class='pet-detail__helper'>
              <Link to='/admin/pets' class='back-btn'>
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
