import Notes from './Notes';
const Home = (props) => {
// const {showAlert}=props;
  return (
    <div>
      <Notes showAlert={props.showAlert}/>
    </div>

  )
}
//rafce always use this
export default Home;