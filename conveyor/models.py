from django.db import models


class PostsState(models.Model):
    post_number = models.IntegerField()
    status_post = models.CharField(max_length=10)


class ButtonsBlocks(models.Model):
    buttons_block_number = models.IntegerField()
    count_click = models.IntegerField()
    posts = models.ManyToManyField(PostsState, related_name='posts', related_query_name='posts_set')

