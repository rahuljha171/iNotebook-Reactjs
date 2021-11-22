import Notes from './Notes';
const Home = (props) => {
const {showAlert}=props;
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>

  )
}
//rafce always use this
export default Home;