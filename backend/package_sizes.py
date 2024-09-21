import os
import importlib.metadata


def get_package_size(package_path):
    size = 0
    for dirpath, dirnames, filenames in os.walk(package_path):
        for file in filenames:
            fp = os.path.join(dirpath, file)
            size += os.path.getsize(fp)
    return size


def convert_size(size_bytes):
    if size_bytes == 0:
        return "0B"
    size_name = ("B", "KB", "MB", "GB", "TB")
    i = int((size_bytes).bit_length() / 10)  # Logarithmic approach
    p = 1024**i
    s = round(size_bytes / p, 2)
    return f"{s} {size_name[i]}"


for dist in importlib.metadata.distributions():
    package_name = dist.metadata["Name"]
    package_location = dist.locate_file(package_name)
    if package_location and os.path.isdir(package_location):
        size = get_package_size(str(package_location))
        print(f"{package_name}: {convert_size(size)}")
    else:
        print(f"Could not determine size for package: {package_name}")
