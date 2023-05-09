
import Footer from '../components/Footer'
function Dashboard() {

  return (
      <div id="about">
        <h1>Dashboard</h1>
        <div>
        <a href="http://localhost:3000/me/businesses">My Businesses</a>
        </div>
        <div>
        <a href="http://localhost:3000/me/approve">My Approvals</a>
        </div>
        <Footer/>
      </div>
  );
}

export default Dashboard;
