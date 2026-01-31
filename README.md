# Punch Clock
A very simple JavaScript app to track your work hours in a day.

## Who is it for?

If you work a 9 to 5 job and you always get in at 9 A.M. and out at 5 P.M.
this app is app is probably not for you.
However, if you have to work 8 hours in a day but the time you come in,
out or take breaks is flexible, e.g.,

- **Situation 1:** you get in at 7:03, take a lunch break at 11:22,
come back at 12:36 and punch out at 17:13, how many hours did you work?
- **Situation 2:**you get in at 8:15, take a lunch break at 11:57, get back at 13:02,
at what time do you need to punch out so you work your 8 hours?

I'm too lazy to do these calculations in my head, but the answers are:

- **Situation 1:** You worked **8 hours and 56 minutes** 
- **Situation 2:** You should punch out at **17:20** if you need to do 8 hours a day.

How do I know that?

Simple: I made this app.

## How it works

- Open the app at [https://ianlopezdiaz.github.io/punck-clock](https://ianlopezdiaz.github.io/punck-clock)
- Select a time: hour and minutes
- Click `"Add Punch"`
- Do it how many times you want to. Only keep in mind that they alternate: Punck IN, Punch OUT, Punch IN, and so on
- When you hit the `"Calculate"` button this is what will happen:
    - If your last punch is "OUT", the app will tell you how many hours you worked.
    - If your last punch is "IN", the app will tell you both how many hours you have worked so far,
    and at what time you should punch OUT so that you worked a set amount of hours (default is 8h).
- If you punched a wrong number, just click the `"Remove Last"` button, add a new punch or not, and hit `"Calculate"` again.
- If you have to work a different number of hours in a day, just change the `"Daily target"`
value from 8 to the value you need.
- Feel free to clone the repository and change it however you want. Customize it to meet your needs.
