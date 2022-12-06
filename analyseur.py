def traitement (key) :
    if (key == ""): return ""
    x = key.split(">")
    if (len(x) == 1) : 
        return ""
    return x[1]

f1 = open("./source4.txt")
s = f1.read().split("<")
f1.close()
_s = []
for key in s:
    _key = traitement(key)
    if (_key != ""): _s.append(_key)
f2 = open("./result4.txt", "a")
i = 0
while i < len(_s) - 1:
    for kfjzbe in range(2):
        if _s[i] == "E":
            i += 1
        f2.write(_s[i] + " ")
        i += 1
    while (_s[i] == ", "):
        for kfjzbe in range(2):
            f2.write(_s[i] + " ")
            i += 1
    i += 3
    f2.write("\n")
f2.close()
