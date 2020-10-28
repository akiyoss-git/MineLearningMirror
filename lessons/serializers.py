from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now
from authentication.models import CustomUser
from .models import Lesson
from courses.models import Course
from rest_framework.validators import UniqueValidator
from django.contrib.humanize.templatetags.humanize import naturaltime


class LessonListSerializer(serializers.ModelSerializer):
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    course = serializers.SlugRelatedField(
        read_only=True,
        slug_field='slug'
    )

    class Meta:
        model = Lesson
        fields = (
            'slug',
            'title',
            'preview',
            'poster',
            'content',
            'created_at',
            'updated_at',
            'creator',
            'course'
        )

        read_only_fields = ('id', 'created_at',
                            'updated_at', 'creator', 'slug',)
        lookup_field = 'slug'


class LessonDetailSerializer(serializers.ModelSerializer):
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )

    class Meta:
        model = Lesson
        fields = (
            'slug',
            'title',
            'preview',
            'poster',
            'content',
            'created_at',
            'updated_at',
            'creator',
            'course'
        )

        read_only_fields = ('id', 'created_at',
                            'updated_at', 'creator', 'slug',)
        lookup_field = 'slug'


class LessonCreateSerializer(serializers.ModelSerializer):
    # A field from the user's profile:
    title = serializers.CharField(required=True)
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    course = serializers.SlugField(required=True)
    content = serializers.CharField(allow_blank=False)
    poster = serializers.URLField(
        allow_blank=False, default='')
    slug = serializers.SlugField(required=True)

    class Meta:
        model = Lesson
        fields = (
            'slug',
            'title',
            'preview',
            'poster',
            'content',
            'created_at',
            'updated_at',
            'creator',
            'course',
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
        course_title = validated_data['course']
        try:
            course = Course.objects.get(slug = course_title)
        except Course.DoesNotExist:
            raise serializers.ValidationError(
                'Thread does not exist, please enter correct course title')

        slug = validated_data['slug']
        title = validated_data['title']
        poster = validated_data['poster']
        content = validated_data['content']
        preview = validated_data['preview']

        lesson = Lesson(
            content=content,
            creator=user,
            slug=slug,
            title=title,
            poster=poster,
            preview=preview,
            course=course,
        )
        lesson.save()
        return lesson


class LessonUpdateSerializer(serializers.ModelSerializer):
    content = serializers.CharField(required=True)
    preview = serializers.CharField(required=True)
    poster = serializers.URLField(allow_blank=False)
    creator = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name='user-detail',
        lookup_field='username'
    )
    slug = serializers.SlugField(required=True)
    course = serializers.SlugField(required=True)

    class Meta:
        model = Lesson
        fields = (
            'id',
            'slug',
            'title',
            'preview',
            'poster',
            'content',
            'created_at',
            'updated_at',
            'creator',
            'course',
        )
        read_only_fields = ('id', 'created_at',
                            'updated_at', 'creator')
        lookup_field = 'slug'

    def update(self, instance, validated_data):
        # Update fields if there is any change
        for field, value in validated_data.items():
            if (field == "course"):
                try:
                    course = Course.objects.get(slug=value)
                    setattr(instance, field, course)
                except Course.DoesNotExist:
                    raise serializers.ValidationError(
                        'Thread does not exist, please enter correct course title')
            else:
                setattr(instance, field, value)
        # Update 'updated_at' field to now
        setattr(instance, 'updated_at', now())

        course_title = validated_data['course']
        
        instance.course = course
        # Note: If user update post, it won't change the last_activity
        instance.save()
        return instance


class LessonDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
