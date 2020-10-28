from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate
from rest_framework.validators import UniqueValidator
from django.contrib.humanize.templatetags.humanize import naturaltime


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        #token['fav_color'] = user.fav_color
        return token


class UserDetailSerializer(serializers.ModelSerializer):
    bio = serializers.CharField()
    avatar = serializers.URLField()
    status = serializers.URLField()
    name = serializers.CharField()
    surname = serializers.CharField()
    second_name = serializers.CharField()
    email = serializers.CharField()
    threads = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='thread-detail',
        lookup_field='pk'
    )
    posts = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='post-detail',
        lookup_field='pk'
    )
    date_joined = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'name',
            'surname',
            'second_name',
            'email',
            'bio',
            'avatar',
            'status',
            'is_staff',
            'date_joined',
            'threads',
            'posts'
        ]
        lookup_field = 'username'

    def get_date_joined(self, obj):
        return naturaltime(obj.date_joined)


class UserListSerializer(serializers.ModelSerializer):
    bio = serializers.CharField()
    avatar = serializers.URLField()
    status = serializers.URLField()
    name = serializers.CharField()
    surname = serializers.CharField()
    second_name = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'name',
            'surname',
            'second_name',
            'email',
            'bio',
            'avatar',
            'status',
            'is_staff',
            'date_joined'
        ]


#Need to be rework
class UserUpdateSerializer(serializers.ModelSerializer):
    # A field from the user's profile:
    bio = serializers.CharField(allow_blank=True)
    name = serializers.CharField(
    	max_length=32,
    	allow_blank=True
    )
    second_name = serializers.CharField(
    	max_length=32,
    	allow_blank=True
    )
    surname = serializers.CharField(
    	max_length=32,
    	allow_blank=True
    )
    avatar = serializers.URLField(allow_blank=True)
    status = serializers.CharField(
    	allow_blank=True,
        default='',
        min_length=0,
    	max_length=16
    )
    old_password = serializers.CharField(
        write_only=True,
        allow_blank=True,
        label=_("Current Password"),
        help_text=_('Required'),
    )
    new_password = serializers.CharField(
        allow_blank=True,
        default='',
        write_only=True,
        min_length=4,
        max_length=32,
        label=_("New Password"),
    )
    email = serializers.EmailField(
        allow_blank=True,
        default='',
        validators=[UniqueValidator(
            queryset=CustomUser.objects.all(),
            message='has already been taken by other user'
        )]
    )

    class Meta:
        model = CustomUser
        fields = (
            'username',
            'name',
            'second_name',
            'surname',
            'email',
            'old_password',
            'new_password',
            'bio',
            #'avatar',
            'status'
        )
        read_only_fields = ('username',)
        lookup_field = 'username'

    def update(self, instance, validated_data):
        # make sure requesting user provide his current password
        # e.g if admin 'endiliey' is updating a user 'donaldtrump',
        # currentPassword must be 'endiliey' password instead of 'donaldtrump' password
        try:
            username = self.context.get('request').user.username
        except:
            msg = _('Must be authenticated')
            raise serializers.ValidationError(msg, code='authorization')
        password = validated_data.get('old_password')
        validated_data.pop('old_password', None)

        if not password:
            msg = _('Must provide current password')
            raise serializers.ValidationError(msg, code='authorization')

        user = authenticate(request=self.context.get('request'),
                            username=username, password=password)
        if not user:
            msg = _('Sorry, the password you entered is incorrect.')
            raise serializers.ValidationError(msg, code='authorization')

        # change password to a new one if it exists
        new_password = validated_data.get('new_password') or None
        if new_password:
            instance.set_password(new_password)
        validated_data.pop('new_password', None)

        name = validated_data['name']
        second_name = validated_data['second_name']
        surname = validated_data['surname']
        bio = validated_data['bio']
        email = validated_data['email']
        instance.name = name
        instance.second_name = second_name 
        instance.surname = surname 
        instance.bio = bio 
        instance.email = email 

        instance.save()
        return instance


class UserCreateSerializer(serializers.ModelSerializer):
    # A field from the user's profile:
    username = serializers.SlugField(
        min_length=4,
        max_length=32,
        help_text=_(
            'Required. 4-32 characters. Letters, numbers, underscores or hyphens only.'
        ),
        validators=[UniqueValidator(
            queryset=CustomUser.objects.all(),
            message='has already been taken by other user'
        )],
        required=True
    )
    password = serializers.CharField(
        min_length=4,
        max_length=32,
        write_only=True,
        help_text=_(
            'Required. 4-32 characters.'
        ),
        required=True
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(
            queryset=CustomUser.objects.all(),
            message='has already been taken by other user'
        )]
    )
    bio = serializers.CharField(
        allow_blank=True, default='')
    name = serializers.CharField(
    	max_length=32,
    	allow_blank=True
    )
    second_name = serializers.CharField(
    	max_length=32,
    	allow_blank=True
    )
    surname = serializers.CharField(
    	max_length=32,
    	allow_blank=True
    )
    avatar = serializers.URLField( 
        allow_blank=True, default='')
    status = serializers.CharField(
    	allow_blank=True,
    	max_length=16,
        min_length=0,
        default=''
    )

    class Meta:
        model = CustomUser
        fields = (
            'username',
            'name',
            'second_name',
            'surname',
            'email',
            'password',
            'bio',
            'avatar',
            'status'
        )

    def create(self, validated_data):
        name = validated_data['name']
        second_name = validated_data['second_name']
        surname = validated_data['surname']
        bio = validated_data['bio']
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        avatar = validated_data['avatar'] or None
        if not avatar:
            avatar = 'https://api.adorable.io/avatar/200/' + username
        user = CustomUser(
            username=username,
            email=email,
            bio=bio,
            avatar=avatar,
            name=name,
            second_name = second_name,
            surname = surname,
            status='Member'
        )
        user.set_password(password)
        user.save()
        return user


"""class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password', 'id', 'name',
                  'surname', 'second_name')
        #extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance





class CustomUserChangeDataSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    name = serializers.CharField(required=True)
    surname = serializers.CharField(required=True)
    second_name = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'name',
                  'surname', 'second_name', "email")

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance


class CustomUserChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ('old_password', 'new_password')

    def validate_new_password(self, value):
        validate_password(value)
        return value
"""
