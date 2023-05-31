import http from 'k6/http';
import { check, sleep} from 'k6';

export const options = {
  stages: [
    {duration: '1s', target: 500 },
    {duration: '28s', target: 500 },
    {duration: '1s', target: 0 }
  ],
};

const getTests = () =>{
  const metaResponse = http.get('http://localhost:3000/reviews/meta?product_id=40451');

  if (metaResponse.status !== 200) {
    console.error('Error fetching reviews');
  } else {
    console.log('Reviews successfully fetched')
  }

  const reviewResponse = http.get('http://localhost:3000/reviews?page=1&count=5&sort=newest&product_id=40348')
  if (reviewResponse.status !== 200) {
    console.error('Error fetching reviews');
  } else {
    console.log('Reviews successfully fetched')
  }
  sleep(1)
}

export default getTests;
