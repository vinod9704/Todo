const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Todo List API...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    console.log('');

    // Test creating a task
    console.log('2. Testing task creation...');
    const createResponse = await axios.post(`${API_BASE_URL}/tasks`, {
      title: 'Test Task',
      description: 'This is a test task created by the API test script'
    });
    console.log('✅ Task created:', createResponse.data);
    const taskId = createResponse.data._id;
    console.log('');

    // Test getting all tasks
    console.log('3. Testing get all tasks...');
    const getAllResponse = await axios.get(`${API_BASE_URL}/tasks`);
    console.log('✅ All tasks retrieved:', getAllResponse.data.length, 'tasks found');
    console.log('');

    // Test updating a task
    console.log('4. Testing task update...');
    const updateResponse = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, {
      title: 'Updated Test Task',
      completed: true
    });
    console.log('✅ Task updated:', updateResponse.data);
    console.log('');

    // Test getting task statistics
    console.log('5. Testing task statistics...');
    const statsResponse = await axios.get(`${API_BASE_URL}/tasks/stats`);
    console.log('✅ Task statistics:', statsResponse.data);
    console.log('');

    // Test deleting a task
    console.log('6. Testing task deletion...');
    const deleteResponse = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    console.log('✅ Task deleted:', deleteResponse.data);
    console.log('');

    console.log('🎉 All API tests passed successfully!');
    console.log('Your backend is working correctly and ready to connect with the frontend.');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status:', error.response.status);
    }
    console.log('\n💡 Make sure your backend server is running on port 5000');
    console.log('Run: cd backend && npm run dev');
  }
}

// Run the test
testAPI();
