import { connect } from 'react-redux';
import axios from 'axios';

const fetchData = () => {
  return axios.get(`${this.props.menuNews.fetchUrl}`).then((res) => {
    console.log(res)
  }).catch((err) => {
    
  })
}

const mapStateToProps = (state) => {
  return{
    menuNews: state.menuNews
  }
}

export default connect(mapStateToProps)(fetchData);
