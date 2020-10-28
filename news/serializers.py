from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now
from authentication.models import CustomUser
from .models import New
from rest_framework.validators import UniqueValidator
from django.contrib.humanize.templatetags.humanize import naturaltime


class NewListSerializer(serializers.ModelSerializer):
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )

    class Meta:
        model = New
        fields = (
            'slug',
            'title',
            'preview',
            'poster',
            'content',
            'created_at',
            'updated_at',
            'creator'
        )

        read_only_fields = ('id', 'created_at',
                            'updated_at', 'creator', 'slug',)
        lookup_field = 'slug'


class NewDetailSerializer(serializers.ModelSerializer):
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )

    class Meta:
        model = New
        fields = (
            'slug',
            'title',
            'preview',
            'poster',
            'content',
            'created_at',
            'updated_at',
            'creator'
        )

        read_only_fields = ('id', 'created_at',
                            'updated_at', 'creator', 'slug',)
        lookup_field = 'slug'


class NewCreateSerializer(serializers.ModelSerializer):
    # A field from the user's profile:
    title = serializers.CharField(required=True)
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    content = serializers.CharField(allow_blank=False)
    poster = serializers.URLField(
        allow_blank=False, default='')
    slug = serializers.SlugField(required=True)

    class Meta:
        model = New
        fields = (
            'slug',
            'title',
            'preview',
            'poster',
            'content',
            'created_at',
            'updated_at',
            'creator'
        )
        read_only_fields = ('id', 'created_at',
                            'updated_at', 'creator')
        lookup_field = 'slug'

    def create(self, validated_data):
        content = validated_data['content']

        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        else:
            raise serializers.ValidationError(
                'Must be authenticated to create post')

        slug = validated_data['slug']
        title = validated_data['title']
        poster = validated_data['poster']
        content = validated_data['content']
        preview = validated_data['preview']

        new = New(
            content=content,
            creator=user,
            slug = slug,
            title = title,
            poster = poster,
            preview = preview
        )
        new.save()
        return new


class NewUpdateSerializer(serializers.ModelSerializer):
    content = serializers.CharField(required=True)
    preview = serializers.CharField(required=True)
    poster = serializers.URLField(allow_blank=False)
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    slug = serializers.SlugField(required=True)

    class Meta:
        model = New
        fields = (
            'id',
            'slug',
            'title',
            'preview',
            'poster',
            'content',
            'created_at',
            'updated_at',
            'creator'
        )
        read_only_fields = ('id', 'created_at',
                            'updated_at', 'creator')
        lookup_field = 'slug'

    def update(self, instance, validated_data):
        # Update fields if there is any change
        for field, value in validated_data.items():
            setattr(instance, field, value)
        # Update 'updated_at' field to now
        setattr(instance, 'updated_at', now())

        # Note: If user update post, it won't change the last_activity
        instance.save()
        return instance


class NewDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = New
        fields = '__all__'


