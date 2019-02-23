import bcrypt

def hash_password(stringIt):  # hash input
    encode = stringIt.encode('utf-8')
    hashed = bcrypt.hashpw(encode, bcrypt.gensalt())
    return hashed


# store hashed pw to database
# compare hashed pw to input hash





