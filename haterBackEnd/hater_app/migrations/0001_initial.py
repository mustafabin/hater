# Generated by Django 4.0.4 on 2022-05-12 22:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='User_profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('tag', models.CharField(max_length=50)),
                ('user', models.OneToOneField(default=4, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Hates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('h_body', models.CharField(max_length=140)),
                ('hate_count', models.IntegerField()),
                ('rehate_count', models.IntegerField()),
                ('crit_count', models.IntegerField()),
                ('hate_date', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('haters', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hater_app.user_profile')),
            ],
        ),
        migrations.CreateModel(
            name='Criticism',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('c_body', models.CharField(max_length=140)),
                ('hate', models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, to='hater_app.hates')),
                ('hater', models.ForeignKey(default=4, on_delete=django.db.models.deletion.CASCADE, to='hater_app.user_profile')),
            ],
        ),
    ]
