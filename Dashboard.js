const [score, setScore] = useState(0);
const [loading, setLoading] = useState(true);
const loadMyData = async () => {
  try {
    // 1. Fetch the data from your server URL
    const response = await fetch('http://127.0.0.1:8000/get-score'); 
    
    // 2. Turn the response into a JavaScript object (JSON)
    const data = await response.json(); 
    
    // 3. Save it to your state
    setScore(data.score); 
    setLoading(false);
  } catch (error) {
    console.error("The backend is not responding!", error);
  }
};
useEffect(() => {
  loadMyData();
}, []); // The empty [] means "only run this once"
