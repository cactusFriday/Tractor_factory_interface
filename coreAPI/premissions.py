from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Кастомный пермишн, позволяющий изменять объект только создателю"""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        # относится только к инцидентам (Accident.user), либо другим моделям, где есть поле user с той же сущностью
        return obj.user == request.user
