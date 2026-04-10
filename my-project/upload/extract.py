#!/usr/bin/env python3
import subprocess, os, sys

os.chdir('/home/z/my-project/upload')

env = os.environ.copy()
env['LC_ALL'] = 'C'
env['PYTHONIOENCODING'] = 'latin1'

result = subprocess.run(
    ['unrar', 'x', 'Advologos - Site v1-2.rar', '-xAdvologos*/node_modules/*', 'advologos2/'],
    capture_output=True,
    env=env,
    timeout=120
)

# Write output to files to avoid encoding issues
with open('/home/z/my-project/upload/extract_stdout.txt', 'wb') as f:
    f.write(result.stdout)
with open('/home/z/my-project/upload/extract_stderr.txt', 'wb') as f:
    f.write(result.stderr)

with open('/home/z/my-project/upload/extract_rc.txt', 'w') as f:
    f.write(str(result.returncode))
