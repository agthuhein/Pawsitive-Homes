import { Link, useNavigate } from 'react-router-dom';

const PetDetails = () => {
  const navigate = useNavigate();
  return (
    <main class='main-content'>
      <div class='pet-detail__grid'>
        <section class='pet-detail__left'>
          <div class='pet-detail__gallery'>
            <figure class='pet-detail__gallery-main'>
              <img
                src='https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1200&auto=format&fit=crop'
                alt='Balu sleeping on a cushion'
              />
            </figure>
            <div class='pet-detail__thumbs'>
              <img
                src='https://images.unsplash.com/photo-1568572933382-74d440642117?q=80&w=1000&auto=format&fit=crop'
                alt='Balu portrait'
              />
              <img
                src='https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1000&auto=format&fit=crop'
                alt='Balu outside'
              />
            </div>
          </div>

          <ul class='pet-detail__facts'>
            <li title='Gender'>♂ Male</li>
            <li title='Age'>📅 3 years</li>
            <li title='Status'>✅ Available</li>
          </ul>

          <p class='pet-detail__desc pet-detail__desc--clamp'>
            Zazu has been waiting for his forever home in a foster home in
            Germany for a year. He has learned a lot during this time and is
            doing very well in our world. He gets along well with other dogs and
            has no problems with cats and children. He has been habituated to
            everything and desensitized. Above all, he is a true people lover.
            Zazu is friendly to everyone, even with strangers. He is extremely
            willing to learn and enjoys it. He is confident walking on a leash
            around people, in city traffic, and on the street.
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
            <h3>Manage Zuzu</h3>

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
