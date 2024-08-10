from django.contrib.auth.models import AbstractUser, UserManager
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _


class newUserManager(UserManager):
    def create_user(self, username, email, password, **extra_fields):
        """
        Creates a new regular user.
        """

        username = "".join(str(username).split(" "))
        email = "".join(str(email).split(" "))
        password = "".join(str(password).split(" "))

        if not username:
            raise ValidationError("Users must have a username")
        if not email:
            raise ValidationError("Users must have an email address")
        if not password:
            raise ValidationError("Users must have a password")

        user = self.model(
            username=username, email=self.normalize_email(email), **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        """
        Creates a new superuser.
        """

        if not username:
            raise ValidationError("Superusers must have a username")
        if not email:
            raise ValidationError("Superusers must have an email address")
        if not password:
            raise ValidationError("superusers must have a password")

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, email, password, **extra_fields)


class NewUser(AbstractUser):
    
    username = models.CharField(primary_key=True,max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    req_sent = models.IntegerField(default=0)
    req_got = models.IntegerField(default=0)

    REQUIRED_FIELDS = ["email", "first_name", "last_name"]  # Include required fields

    objects = newUserManager()

    def __str__(self):
        return f"{self.username} ({self.first_name} {self.last_name})"
