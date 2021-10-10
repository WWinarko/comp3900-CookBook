from error import InputError

def is_empty_string(string):
    '''
      Returns True if string is any combination of empty
      E.g. Contains only spaces, tabs, new lines or no character

    '''

    string = string.strip()

    if string and (not string.isspace()):
        return False

    return True

def all_not_empty(args):
    '''
      Given a list of string, passes if they're all not empty
      Else raises InputError if any are empty
    '''
    for string in args:
        if is_empty_string(string):
            raise InputError(description='An input field is empty')

def no_white_space(args):
    '''
        Checks list of arguments is not all white space
        Also checks that argument doesn't contain any whitespace chars
        Will raise InputError if invalid
    '''
    all_not_empty(args)

    for arg in args:
        if ' ' in arg:
            raise InputError(description='Input contains space')
        if "\t" in arg:
            raise InputError(description='Input contains space')
        if "\n" in arg:
            raise InputError(description='Input contains space')
        if "\v" in arg:
            raise InputError(description='Input contains space')
        if "\f" in arg:
            raise InputError(description='Input contains space')
        if "\r" in arg:
            raise InputError(description='Input contains space')