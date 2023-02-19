I was having an issue with `expo-camera` where the `Camera` component would
unmount while recording a video and the `recordAsync` call would never return
meaning I could never handle the resulting video file (in my case I was
immediately trying to store the video to an S3 bucket).

This repo is the most minimal I could do to reproduce this issue. Though the
reproduction doesn't happen all the time. With this app loaded in Expo Go try
going to camera test page, pressing `Start Recording` and then pressing `Go Home`
while the camera is still recording. In some cases I never see the
`Recorded video at...` log message.

However, in my actual app I'm seeing this all the time.  This makes me think
this is some sort of timing issue.  I thought that maybe the JS engine was just
getting a little over eager with garbage collection, or something when a
component would unmount. However, the `sleep-test` route did not show similar
behavior.

Anyway, really not sure what is going on here.  Any help would be appreciated.

Couple other notes. I couldn't get this to happen without `expo-router` setup.
And a `_layout` also needed to be present. However, I don't think `expo-router`
is to blame.  I think it is just exasperating the timing issue that is deeper
within `Camera`.  Though that is a complete hunch, feel free to disregard.
