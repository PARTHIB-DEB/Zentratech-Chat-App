import pytest
from users.serializers import *

@pytest.mark.django_db  
def test_create_user(api_client) -> None:  
    payload = {  
        "username":"AmalX012",  
        "first_name":"Amal",
        "last_name":"Kumar",
        "email":"Ak@gmail.com",  
    }  
  
    # Create User
    if UserSerializer(data=payload).is_valid():
        response_create = api_client.post("/api/register", data=payload, format="json")   
        assert response_create.status_code == 201
        assert response_create.data["username"] == payload["username"]  
    
    
    # Read User 
    response_read = UserSerializer(data=api_client.get(f"/api/register", format="json"))
    assert response_read.status_code == 200  
    assert response_create.data["username"] == payload["username"]


@pytest.mark.django_db  
def test_create_user(api_client) -> None:  
    payload = {  
        "user":"AmalX012",  
        "Sender":"Pkq123", 
    }  
  
    # Create User
    if RequestSerialiser(data=payload).is_valid():
        response_create = api_client.post("/api/request", data=payload, format="json")   
        assert response_create.status_code == 201
        assert response_create.data["user"] == payload["user"]  
    
    
    # Read User 
    response_read = UserSerializer(data=api_client.get(f"/api/request", format="json"))
    assert response_read.status_code == 200  
    assert response_create.data["sender"] == payload["sender"]
