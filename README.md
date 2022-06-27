# Blogging-Site
Project 1:





Regex for password:

/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/

Took me a while to figure out the restrictions, but I did it!

Restrictions: (Note: I have used >> and << to show the important characters)

Minimum 8 characters {>>8,20}
Maximum 20 characters {8,>>20}
At least one uppercase character (?=.*[A-Z])
At least one lowercase character (?=.*[a-z])
At least one digit (?=.*\d)
At least one special character (?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]

const isValid = function (value) {
    if (typeof value === "undefined" || value === null ) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};
