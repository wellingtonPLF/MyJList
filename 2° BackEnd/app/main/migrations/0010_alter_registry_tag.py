# Generated by Django 4.2.1 on 2023-10-14 11:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_alter_registry_tag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registry',
            name='tag',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.tag'),
        ),
    ]
