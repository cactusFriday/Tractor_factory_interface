from django.db import models


class PostsState(models.Model):
    post_number = models.IntegerField()


class ButtonsBlocks(models.Model):
    buttons_block_number = models.IntegerField()
    count_click = models.IntegerField()
    status_block = models.CharField(max_length=10)
    posts = models.ManyToManyField(PostsState, related_name='buttons_set', related_query_name='buttons')
