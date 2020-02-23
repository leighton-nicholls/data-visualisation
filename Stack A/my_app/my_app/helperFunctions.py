def isFloat(value):
  try:
    float(value)
    return True
  except ValueError:
    return False

def isInteger(value):
  try:
    int(value)
    return True
  except ValueError:
    return False
