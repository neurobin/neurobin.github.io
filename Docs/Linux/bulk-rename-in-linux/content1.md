We will use a bunch of files to demonstrate the use of the Unix bulk renaming tool: rnm. We will apply replacement, modification, case-conversion, indexing etc.. on the file names and rename them accordingly. We will also apply selective renaming (search functionality) to the files/directories.

These are the files that we are going use for our examples:

```
abc.png
def.png
ghi.png
jkl.png
abc.jpg
def.jpg
ghi.jpg
jkl.jpg
```
These files will get changed in each operation and in some cases we may undo some rename operation with `rnm -u` command for specific purposes.

<div id="1"></div>
#1. Lowercase-Uppercase conversion:
A common task which appears in mind for file renaming is to convert uppercase file names to lower case and vice-versa. With `rnm`, we can apply case-conversion to the whole file name as well as part of the file name. To change the case for a part of the file name, we will select that part with regex and replace it with it's upper or lower case (`\c` for lower case, `\C` for uppercase).

<div id="1.1"></div>
##1.1 Changing the full filename to uppercase or lower case:

We will pass all the filenames in current directory (`./*`) as arguments.

```
rnm -rs '/.*/\C/' ./*
```

This is how the files will look like after the above command:

```
ABC.JPG
ABC.PNG
DEF.JPG
DEF.PNG
GHI.JPG
GHI.PNG
JKL.JPG
JKL.PNG
```
####Explanation:
> `-rs` takes a replace string. Replace string is comprised of three parts (separated by `/`): selection part, replace part and modifier. In the above command, `.*` is the selection part, it selects all i.e the full name of the file, and `\C` is the replace part. Modifier part is empty here. In the replace part `\C` (capital C) points to the upper case version of the actual selected part of the filename (for lowercase it's `\c` with a small c). So basically, the selected part (whole filename) is being replaced with its uppercase version.

Now let's do a lowercase conversion:

```
rnm -y -rs '/.*/\c/' ./*
```
Now it will look like this:

```
abc.jpg
abc.png
def.jpg
def.png
ghi.jpg
ghi.png
jkl.jpg
jkl.png
```

>The `-y` flag confirms all to `yes`. If it is not given, `rnm` asks for confirmation before actual renaming.

<div id="1.2"></div>
##1.2 Applying uppercase-lowercase conversion on filenames partially:

Now, lets change the case of filenames without the extensions, i.e .jpg, .png should be intact. To do that we will have to select the part before the last `.` and replace it with its case-converted version.

This command will do that:

```
rnm -rs '/.*\./\C/' ./*
```

Now the files in our directory:

```
ABC.jpg
ABC.png
DEF.jpg
DEF.png
GHI.jpg
GHI.png
JKL.jpg
JKL.png
```
>`.*\.` selects the string from beginning to the occurrence of `.` and replaces with its uppercase-version. You could do the same with the extension too. To select the extension, you would have to use the regex `\.*`.

`rnm` has built-in support for extension management. For filename extensions, you generally have to care for several things, like for a file named `.config`, you can't say that the `config` part is the extension. Hidden files in Linux starts with a dot at the beginning and those don't generally have extensions. So it's better to use the built-in functionality of `rnm` to handle filename extensions. Here's an example of doing the same thing as above with built-in filename extension support:

```
rnm -rs '//n//\C/' ./*
```
>`/n/` is a *Name String Rule* and equals to the filename without extension.

To do the same on the extensions:

```
rnm -rs '//e/$/\C/' ./*
```

> `/e/` is another *Name String Rule* which equals to the extension of the file. For files like `.config` this remains empty. The `$` (regex) makes sure the extension is selected at the end, not anywhere else in the filename.

<div id="1.3"></div>
##1.3 Applying multiple uppercase-lowercase conversions:

This time we are going to change the case of several letters in the file name, literally 'a', 'j', 'n'. Obviously we can do it in three steps with three `rnm` commands, but we are going to do it with a single command. The current sate of the filenames in our directory are all small-letters.

Files:
```
abc.jpg  abc.png  def.jpg  def.png  ghi.jpg  ghi.png  jkl.jpg  jkl.png
```
Let's run the command:
```
rnm -rs '/a/\C/;/g/\C/g;/n/\C/' ./*
```
The files will look like:
```
Abc.jpG  Abc.pNG  def.jpG  def.pNG  Ghi.jpG  Ghi.pNG  jkl.jpG  jkl.pNG
```

> As you can see, the `-rs` option can take multiple *Replace Strings* terminated with a semicolon (`;`). Notice the replace string: `/g/\C/g`, here we have used a modifier `g` which means global i.e the replacement will be applied to every occurrences (Not only the first occurrence) of `g` found on the filename.

<div id="2"></div>
#2 Replace, modify, delete, swap part of a filename:

As we have already seen that `-rs` option takes a *Replace String* and performs replacement on filenames, we can use this to replace, modify or delete part of a filename or the change the whole filename altogether.

The current state of the files in our directory:
```
abc.jpg
abc.png
def.jpg
def.png
ghi.jpg
ghi.png
jkl.jpg
jkl.png
```
A general replacement example:

```
rnm -rs '/a/AbracaDabra/' ./*
```
> This will replace the first occurrence of an 'a' in the filenames with 'AbracaDabra'

Now the files look like:

```
AbracaDabrabc.jpg
AbracaDabrabc.png
def.jpg
def.png
ghi.jpg
ghi.png
jkl.jpg
jkl.png
```
<div id="2.1"></div>
##2.1 Delete part of a filename:

To delete part of a filename we just need to replace that part with an empty string. Let's delete all d's from the filenames:
```
rnm -rs '/d//gi' ./*
```
Now the files look like:
```
Abracaabrabc.jpg
Abracaabrabc.png
ef.jpg
ef.png
ghi.jpg
ghi.png
jkl.jpg
jkl.png
```
> We are selecting `d` and replacing it with empty string (delete operation). We have used two modifiers here: `g` and `i`. We already know that `g` is for global, and the newly introduced `i` is for case-insensitive search/selection. Thus you can see that the capital `D` in `AbracaDabra` is been deleted too.

<div id="2.2"></div>
##2.2 Modify part of a filename:

Now let's delete `Abrac` and `abra` from the filenames and insert a `d` for the filenames starting with `ef`:
```
rnm -rs '/abrac//i;/abra//i;/^ef/d&/' ./*
```
Now the files look like:

```
abc.jpg
abc.png
def.jpg
def.png
ghi.jpg
ghi.png
jkl.jpg
jkl.png
```
> As you have already noticed, `-rs` option can take multiple *Replace Strings*. Notice the *Replace String*: `/^ef/d&/`, the regex `^ef` selects/matches `ef` at the beginning and replaces it with `d` and the match (`&` is the match found by the regex `^ef` i.e `ef` itself).

<div id="2.3"></div>
##2.3 Swap part of filenames with another part:

Let's swap the parts on either side of the dot (.) in each filename:
```
rnm -rs '/(.*)\.(.*)/\2.\1/' ./*
```
Now the state of files in our directory:
```
jpg.abc
jpg.def
jpg.ghi
jpg.jkl
png.abc
png.def
png.ghi
png.jkl
```
> `\n` is the n'th back-reference, i.e `\1` is the first captured group in the search/select/match regex `(.*)\.(.*)`, and `\2` is the second captured group.

<div id="2.4"></div>
##2.4 Another replacement example:
We will now replace 'a' with 'AbracaDabra' but not all 'a'; only the files containing 'png' at first will be subject to this replacement:
```
rnm -rs '/(^png.*)a/\1AbracaDabra/' ./*
```
The files now:
```
jpg.abc
jpg.def
jpg.ghi
jpg.jkl
png.AbracaDabrabc
png.def
png.ghi
png.jkl
```
> Yap, that's one file only. That file was the only one matching the regex `(^png.*)a` and we kept the `(^png.*)` part unchanged with the back-reference `\`.

<div id="2.5"></div>
##2.5 Mixing with case-conversion:

Yes, you can mix other replacement methods with case-conversion too. Case-conversion is nothing but a specialized form of *Replace String*. Let's swap the two sides of the dot (.) once again and convert them to uppercase excluding extensions:
```
rnm -rs '/(.*)\.(.*)/\2.\1/;/.*\./\C/' ./*
```
The files now look like:
```
ABC.jpg
ABRACADABRABC.png
DEF.jpg
DEF.png
GHI.jpg
GHI.png
JKL.jpg
JKL.png
```
> You may be wondering why the png and jpg were taken as extensions, they were at the beginning not at end. Yes that's right, but the first *Replace String* changed that order by swapping the two sides of the dot (.) i.e when the second *Replace String* were executed, it got the png and jpg as the file extensions.

> N.B: the *Name String Rule* `/e/` always contains the actual extension and `/n/` always contains the actual filename without extension.

Let's see what happens if we use built-in filename extension support. First let's undo the last operation:
```
rnm -u
```
Files will look like:
```
jpg.abc
jpg.def
jpg.ghi
jpg.jkl
png.AbracaDabrabc
png.def
png.ghi
png.jkl
```
Now let's use `/n/` for the filename without extension instead of the regex `.*\.` like the previous command:
```
rnm -rs '/(.*)\.(.*)/\2.\1/;//n//\C/' ./*
```
The files will look like:
```
abc.JPG
AbracaDabrabc.PNG
def.JPG
def.PNG
ghi.JPG
ghi.PNG
jkl.JPG
jkl.PNG
```
> The actual filename-without-extension (left side of the dot) was jpg or png and thus those two are the only ones which got capitalized. The *Name String Rule* `/n/` always contains the actual filename-without-extension no matter how many times replacement is occurred on the filename.

<div id="3"></div>
#3 Indexing of files:
`rnm` provides certain *Name String Rules* for filename indexing. Name string rules are some predefined rules which provide some extended functionalities. Each of them has a unique definition and meaning and can be used in *Replace String* or *Name String* to generate new names for files. Name string is a string that simply implies a name for a file (*Name String*=name of file).

<div id="3.1"></div>
##3.1 Insert general index in filenames:

`/i/` is the *Name String Rule* for general indexing. Let's insert an index before the dot (.) in those files:

```
rnm -rs '//n//&/i//' ./*
```
The files now:
```
abc1.JPG
AbracaDabrabc2.PNG
def3.JPG
def4.PNG
ghi5.JPG
ghi6.PNG
jkl7.JPG
jkl8.PNG
```
Now, let's replace those indexes with better indexes:
```
rnm -rs '/\d//i//' -ifl 3 ./*
```
The files now:
```
abc001.JPG
AbracaDabrabc002.PNG
def003.JPG
def004.PNG
ghi005.JPG
ghi006.PNG
jkl007.JPG
jkl008.PNG
```
> `-ifl` stands for index field length, empty field will be filled index field filler (defaults to 0).

Let's fill the empty field of indexes with other character than a zero (0). First undo `rnm -u` so that files look like:
```
abc1.JPG
AbracaDabrabc2.PNG
def3.JPG
def4.PNG
ghi5.JPG
ghi6.PNG
jkl7.JPG
jkl8.PNG
```
Now run command:
```
rnm -rs '/\d//i//' -ifl 3 -iff '*' ./*
```
Now the files look like:
```
abc**1.JPG
AbracaDabrabc**2.PNG
def**3.JPG
def**4.PNG
ghi**5.JPG
ghi**6.PNG
jkl**7.JPG
jkl**8.PNG
```
> `-iff` stands for index field filler, empty field will be filled with specified character.

You want all the PNGs to be indexed first and JPGs second:
```
rnm -rs '/\d//i//' -ifl 3 *.PNG *.JPG
```
Files now:
```
abc**005.JPG
AbracaDabrabc**001.PNG
def**002.PNG
def**006.JPG
ghi**003.PNG
ghi**007.JPG
jkl**004.PNG
jkl**008.JPG
```
> 4 PNGs were indexed first.

Let's insert another index after the first letter in every filename:
```
rnm -rs '/./&/i//' -ifl 4 ./*
```
Files now:
```
a0001bc**005.JPG
A0002bracaDabrabc**001.PNG
d0003ef**002.PNG
d0004ef**006.JPG
g0005hi**003.PNG
g0006hi**007.JPG
j0007kl**004.PNG
j0008kl**008.JPG
```
Let's insert another index at the end:
```
rnm -rs '/$//i//' -ifl 5 ./*
```
Files now:
```
a0001bc**005.JPG00001
A0002bracaDabrabc**001.PNG00002
d0003ef**002.PNG00003
d0004ef**006.JPG00004
g0005hi**003.PNG00005
g0006hi**007.JPG00006
j0007kl**004.PNG00007
j0008kl**008.JPG00008
```
That's enough general indexing, let's get back our original files:
```
rnm -rs '/\d+//g;/\*+//g;/Abrac//;/Dabra//' ./*
```
Files now:
```
abc.JPG
abc.PNG
def.JPG
def.PNG
ghi.JPG
ghi.PNG
jkl.JPG
jkl.PNG
```

<div id="3.2"></div>
##3.2 Insert directory-wise index in filenames:
The name string rule for directory-wise indexing is `/id/`. It is the same as `/i/` except in every directory it is initialized to 1 or a user set value. It is useful if you rename files recursively in multiple directories. In every directory `/id/` is reinitialized where `/i/` always increases or decreases. To see it in action, let's create a directory named `folder1` and copy the files there. Thus we have the same set of files in two directories.

Now, let's run an indexing command:

```
rnm -rs '/$//id//' -ifl 3 -fo -dp -1 ./*
```
Files:
```
./abc.JPG001
./abc.PNG002
./def.JPG003
./def.PNG004
./folder1/abc.JPG001
./folder1/abc.PNG002
./folder1/def.JPG003
./folder1/def.PNG004
./folder1/ghi.JPG005
./folder1/ghi.PNG006
./folder1/jkl.JPG007
./folder1/jkl.PNG008
./ghi.JPG005
./ghi.PNG006
./jkl.JPG007
./jkl.PNG008
```
> `-fo` stands for file only mode. `-dp` stands for depth of directory. `-1` makes unlimited depth i.e it will go through as many subdirectories there are. `-dp` without file only mode (`-fo`) is meaningless.

<div id="3.3"></div>
##3.3 Set start index and/or end index for file indexing:
You can set an starting index from where the indexing will start and also an end index where the index will stop. When end index is reached it will stop renaming files.

Let's set an starting index of `50` and insert that index at the beginning of every file:
```
rnm -rs '/^//i//' -ifl 3 -si 50 -fo -dp -1 ./*
```
Files now:
```
./050abc.JPG001
./051abc.PNG002
./052def.JPG003
./053def.PNG004
./062ghi.JPG005
./063ghi.PNG006
./064jkl.JPG007
./065jkl.PNG008
./folder1/054abc.JPG001
./folder1/055abc.PNG002
./folder1/056def.JPG003
./folder1/057def.PNG004
./folder1/058ghi.JPG005
./folder1/059ghi.PNG006
./folder1/060jkl.JPG007
./folder1/061jkl.PNG008
```
> `-si` or `-i` stands for starting index.

Let's set an starting index of 40 and end index of 44 and see what happens:
```
rnm -rs '/^//id//' -ifl 3 -i 40 -ei 44 -fo -dp -1 ./*
```
Files now:
```
./040050abc.JPG001
./041051abc.PNG002
./042052def.JPG003
./043053def.PNG004
./044062ghi.JPG005
./045063ghi.PNG006
./046064jkl.JPG007
./047065jkl.PNG008
./folder1/040054abc.JPG001
./folder1/041055abc.PNG002
./folder1/042056def.JPG003
./folder1/043057def.PNG004
./folder1/044058ghi.JPG005
./folder1/059ghi.PNG006
./folder1/060jkl.JPG007
./folder1/061jkl.PNG008
```
> As you can see, the end index only worked inside the directory. When you pass files with filename globbing like `./*` or `*`, every files and directories are passed as each arguments and each argument for `rnm` is important and thus `rnm` doesn't skip any of them, not even if the index ends. The end index is valid only for files which are inside a directory that has been passed as a command line argument or taken recursively by `rnm` itself. In a nut-shell, end index works on directory index only.

<div id="3.4"></div>
##3.4 Reserve index for skipped files:
Some files may be skipped for various reasons. Also you can manually skip a file from renaming. In these cases the index for that file is not reserved i.e the index of that file is given to the next file. But there's a name string rule which keeps track of these indexes. These indexes are called reserved indexes. To form a name string rule that reserves indexes for skipped file simply add a `r` at the end of the index name in a *Name String Rule*. For example, `/i/` to `/ir/`, `/id/` to `/idr/` etc...

Let's see it in action:

```
rnm -sim -f -ns '/ir/' /*

/bin    ---->    /1

Select action:

    1. Confirm for this file only.
    2. Confirm for all.
    3. Skip this file.
    4. Skip all and exit

Your choice: 3

/boot    ---->    /2

Select action:

    1. Confirm for this file only.
    2. Confirm for all.
    3. Skip this file.
    4. Skip all and exit

Your choice: 3

/cdrom    ---->    /3

Select action:

    1. Confirm for this file only.
    2. Confirm for all.
    3. Skip this file.
    4. Skip all and exit

Your choice: 
```
> We have used the `/` directory here. Don't worry, it's perfectly safe. The `-sim` option runs a simulation (not actual rename). Just note the fact that even if the files are skipped, the index continues to increase i.e those indexes are being reserved for those skipped files/directories. `-ns` is name string (simply name of file).

<div id="3.5"></div>
##3.5 Negative indexing of files (Decremented index):

A minus sign (`-`) inside Name string rule implies negative index. The -ve of `/i/` is `/-i/`, -ve of `/id/` is `/-id/` etc.. More appropriately it's decremented index.

```
rnm -ifl 2 -rs '/^//-id//' ./*
```

Files now:

```
-01040050abc.JPG001
-02041051abc.PNG002
-03042052def.JPG003
-04043053def.PNG004
-05044062ghi.JPG005
-06045063ghi.PNG006
-07046064jkl.JPG007
-08047065jkl.PNG008
-09folder1
```

> Note that, it didn't go inside the directory, instead it renamed the directory itself.

<div id="3.6"></div>
##3.6 Configure increment value for file indexing:

You can configure the increment value of the index with the `-inc` option. It can take floating point decimal +ve number. -ve number is not allowed because decremented index will be available through name string rules `/-i/`, `/-id/` etc.

Let's set increment of 4 starting from 6.
```
rnm -rs '/-\d+//id//' -inc 4 -si 6 ./*
```
Files now:

```
6abc.JPG001
10abc.PNG002
14def.JPG003
18def.PNG004
22ghi.JPG005
26ghi.PNG006
30jkl.JPG007
34jkl.PNG008
38folder1
```

Let's set the increment value at 4.5 and start from 6:
```
rnm -rs '/\d+//id//' -inc 4.5 -si 6 ./*
```
Files now:

```
6abc.PNG002
10.5def.JPG003
15def.PNG004
19.5ghi.JPG005
24ghi.PNG006
28.5jkl.JPG007
33jkl.PNG008
37.5folder1
42abc.JPG001
```

<div id="4"></div>
#4 Search for files and rename:
`rnm` has built-in search functionality. It uses regex or fixed string to search for files/directories. The `-ss` and `-ssf` option takes search strings. `-ss` is for regex search and `-ssf` is for fixed string search.

<div id="4.1"></div>
##4.1 Search for files with regex and rename:

Let's apply rename if only some specific string exists in the filename. We will rename those files which starts with a `1` at the beginning:

Current state of files:
```
6def.PNG004
11ghi.JPG005
15ghi.PNG006
20jkl.JPG007
24jkl.PNG008
29abc.JPG001
33abc.PNG002
38folder1
42def.JPG003
```
Let's run the command:
```
rnm -rs '/\d+\.?\d*//' -ss '^1' ./*
```
Files now:

```
ghi.JPG005
ghi.PNG006
6def.PNG004
20jkl.JPG007
24jkl.PNG008
29abc.JPG001
33abc.PNG002
38folder1
42def.JPG003
```

<div id="4.2"></div>
##4.2 Search for files with fixed strings and rename:

For fixed string search we will use the `-ssf` option.
```
rnm -rs '/\d+\.?\d*//' -ssf '.' ./*
```

Files now:
```
abc.JPG001
abc.PNG002
def.JPG003
def.PNG004
ghi.JPG
ghi.PNG
jkl.JPG007
jkl.PNG008
38folder1
```
> Dot (`.`) matches any character when used as regex. But as a fixed string it's just dot. The `38folder1` doesn't contain any dot and thus skipped.

<div id="4.3"></div>
##4.3 Search for files with multiple search strings and rename:
The option `-ss` or `-ssf` can take multiple search strings. In such cases search strings are to be wrapped around with `/` and terminated with semicolon (`;`).
```
rnm -rs '/\d+\.?\d*//' -ssf '/./;/8/' ./*
```

```
abc.JPG
abc.PNG
def.JPG
def.PNG
folder1
ghi.JPG
ghi.PNG
jkl.JPG
jkl.PNG
```

<div id="4.4"></div>
##4.4 Search for files with case-insensitive search and rename:
For case insensitive search we can use a modifier (`i`). To use modifier search strings are to be wrapped around with `/`.
```
rnm -rs '/.//i/&/' -ss '/A/i' ./*
```

Files now:
```
def.JPG
def.PNG
folder1
ghi.JPG
ghi.PNG
jkl.JPG
jkl.PNG
1abc.JPG
2abc.PNG
```
> Even though we searched for capital 'A', it worked on small 'a' because of the case-insensitive search.
