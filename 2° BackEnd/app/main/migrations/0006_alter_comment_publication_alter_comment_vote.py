# Generated by Django 4.2.1 on 2023-10-11 08:13

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20231010_2053'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='publication',
            field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='vote',
            field=models.CharField(choices=[('0', 'Premiation'), ('1', 'Funny'), ('2', 'Yes'), ('3', 'No')], max_length=50, null=True),
        ),
    ]
