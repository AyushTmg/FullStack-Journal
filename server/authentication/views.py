from .models import User 
from .tokens import get_tokens_for_user
from utils.response.response import CustomResponse as cr 
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserChangePasswordSerializer,
    UserPasswordResetSerializer,
    SendPasswordResetEmailSerializer
)


from rest_framework.views import APIView
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_401_UNAUTHORIZED
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)


from django.contrib.auth import authenticate



# ! User Registration View
class UserRegistrationView(APIView):
    serializer_class=UserRegistrationSerializer
    # permission_classes=[AllowAny]
    authentication_class = []


    def post(self,request):
        """
        Registering User Account
        """
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return cr.success(
            message="Your account has been successfully registered",
            status=HTTP_201_CREATED
        )
    



# ! User Login View
class UserLoginView(APIView):
    serializer_class=UserLoginSerializer
    permission_classes=[AllowAny]


    def post(self,request):
        """
        Logging User and generating tokens
        """
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        # ! Gets the validated data from the serializer 
        email=serializer.data.get('email')
        password=serializer.validated_data.get('password')

        # ! Checks if the user exists with the given credentials or not
        user=authenticate(email=email,password=password)

        # ! If a User exists  then generate Token for that user
        if user is not None:
            token=get_tokens_for_user(user)
            return cr.success(
                data=token,
                message="You have been successfully logged in",
            )
        
        # ! If User Doesn't exists or Invalid Credintials 
        return cr.error(
            message="Invalid Credential provided",
            status=HTTP_401_UNAUTHORIZED
        )
    



# ! User Change Password View
class UserChangePasswordView(APIView):
        serializer_class=UserChangePasswordSerializer
        permission_classes=[IsAuthenticated]


        def post(self,request):
            """
            Changing Authenticated User Password 
            """
            user=request.user
            serializer=self.serializer_class(
                data=request.data,
                context={'user':user}
            )
            serializer.is_valid(raise_exception=True)

            return cr.success(
                message="Your password has been successfully changed"
            )
        



# !Send Password Reset Email View
class SendPasswordResetEamilView(APIView):
    serializer_class=SendPasswordResetEmailSerializer


    def post(self,request):
        """
        Method for sending email for resetting users password
        """
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return cr.success(
            message="Link for resetting your password has been sent to your email"
        )
    



# ! User Password Reset View 
class UserPasswordResetView(APIView):
    serializer_class=UserPasswordResetSerializer
    permission_classes=[AllowAny]


    def post(self,request,uid,token):
        """
        Method For Resetting User Password
        """
        serializer=self.serializer_class(
            data=request.data,
            context={'uid':uid,'token':token}
        )
        serializer.is_valid(raise_exception=True)

        return cr.success(
            message="Your password has been successfully changed"
        )
        

     
             







