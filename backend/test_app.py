import sys
import os

# Add the 'backend' directory to the Python path (adjusted to the current script's location)
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))


from routes.diary_routes import diary_routes


from app import app
from config import diary_collection
import pytest

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Test cases as provided previously...


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Test for GET /diary/
def test_get_diary_entries(client):
    # Insert sample data for testing
    diary_collection.insert_one({"content": "Sample Content", "advantage": "Creative", "person": "John Doe"})

    response = client.get('/diary/')
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0  # Ensure that at least one diary entry exists

# Test for POST /diary/ - Valid data
def test_add_diary_entry_valid(client):
    data = {"content": "Testing Diary Entry", "advantage": "Helpful", "person": "Tester"}
    response = client.post('/diary/', json=data)
    assert response.status_code == 201
    assert response.json["message"] == "Diary entry added successfully"

# Test for POST /diary/ - Missing fields
def test_add_diary_entry_missing_fields(client):
    data = {"content": "Incomplete data"}
    response = client.post('/diary/', json=data)
    assert response.status_code == 400

# Test for POST /chatbot/ - Valid request
def test_chatbot_hello(client):
    # Insert sample data to respond to "hello"
    diary_collection.insert_one({"content": "Another Diary", "advantage": "Kind", "person": "Alex"})

    response = client.post('/chatbot/', json={"message": "hello"})
    assert response.status_code == 200
    assert "response" in response.json
    assert "You are a" in response.json["response"]
