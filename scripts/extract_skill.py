import zipfile
import os

zip_path = '/root/.openclaw/media/inbound/file_0---65d229df-dd69-44dc-975f-709bafd528e0.zip'
extract_to = '/tmp/skill_install'

if not os.path.exists(extract_to):
    os.makedirs(extract_to)

with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(extract_to)
