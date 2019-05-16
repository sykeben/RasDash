<img style="display:block;" src="https://github.com/sykeben/RasDash/raw/master/public/images/icon-banner.png" width="100%">

# RasDash

A Raspberry Pi dashboard built on NodeJS.  
<sup>~ [Status](#project-state) ~ [Install](#installing-rasdash) ~ [Configure](#changing-the-config) ~ [Run](#startingstoppingrestarting-rasdash) ~ [Update](#updating-rasdash) ~ [Uninstall](#uninstalling-rasdash) ~ [Guidelines](#guidelines) ~ [Subreddit](https://www.reddit.com/r/rasdash/) ~</sup>

<br>

### Project State

A moderate rewrite, [v1.0.0](https://github.com/sykeben/RasDash/tree/1.0-rewrite), is in the works because I've really grown as a dev since starting this project and I think it's time for me to use these skills to make this just a bit greater. A lot of the code in this application has been sitting around since like [v0.1.0](https://github.com/sykeben/RasDash/tree/bb1611e653eb68159f415aec2b78cd335bdea123), which was never actually put into the releases page. As of now, backend-side of things will remain completely the same as it works well.  

My plans for the 1.0.0 rewrite are to simply redo the UI. After this UI refresh I think RasDash will be finally on it's way to, what I would consider, being a great little application. For those who worry the UI will completely deviate from the current layout, don't. As of now, I do not plan to change the layout at all, I just plan to switch the style to work well with all browsers, and on most screen sizes as I see this may be a good tool for checking a Pi's status from some mobile device.  

All work for this refresh will be done in the [1.0-rewrite](https://github.com/sykeben/RasDash/tree/1.0-rewrite) branch as to not interfere with the current code.

<br>

### Build Testing Status

| Branch | Status |
|---|---|
| Master | ![AppVeyor](https://img.shields.io/appveyor/ci/sykeben/rasdash.svg?style=plastic) |
| Latest Release | ![AppVeyor](https://img.shields.io/appveyor/ci/sykeben/rasdash-l43ue.svg?style=plastic) |
| Live Demo | ![Heroku](https://heroku-badge.herokuapp.com/?app=rasdash-livedemo) |

<br>

### Installing RasDash

Installing RasDash is pretty easy:
1. On a Raspberry Pi running PiXEL, run the following command in your terminal: `git clone https://github.com/sykeben/RasDash.git ~/RasDash`, this will clone the current version of the code to your device.
2. Once cloned, run `cd ~/RasDash; sudo ./install_deps`, this will install all dependencies for RasDash.
3. After all that, you can install the RasDash service by running `cd ~/RasDash; ./service_manager install; ./service_manager start`.

<br>

### Changing the Config

If for some reason RasDash is conflicting with ports from another process, you can change the `~/RasDash/config.json` file's `port` property to be any other port that works for you. After changing the config please restart RasDash by running `cd ~/RasDash; ./service_manager restart`.

<br>

### Starting/Stopping/Restarting RasDash

All service related functions can be managed via the `service_manager` script. It can start, stop, restart, install, and uninstall the `RasDash` service.

<br>

### Updating RasDash

Updating RasDash is pretty easy. Just repull the repo to `~/RasDash` and restart the service.

<br>

### Uninstalling RasDash

If for some reason your unhappy with RasDash, you can uninstall it:
1. First, let's remove the service. Run `cd ~/RasDash; ./service_manager stop; ./service_manager uninstall`.
2. Now, all we need to do is remove the files left. Run `rm -rf ~/RasDash` to make them disappear.

<br>

### Community Perception

More information about RasDash from the community \(and me\) has been written on...
- [AlternativeTo](https://alternativeto.net/software/rasdash/)
- [Hackaday.io](https://hackaday.io/project/164593-rasdash)
- [MOONGIFT](http://moongift.jp/2019/05/rasdash-raspberry-pi%e7%94%a8%e3%81%ae%e3%83%80%e3%83%83%e3%82%b7%e3%83%a5%e3%83%9c%e3%83%bc%e3%83%89/) \([English Translation](https://translate.googleusercontent.com/translate_c?depth=1&rurl=translate.google.com&sl=auto&sp=nmt4&tl=en&u=https://www.moongift.jp/2019/05/rasdash-raspberry-pi%25E7%2594%25A8%25E3%2581%25AE%25E3%2583%2580%25E3%2583%2583%25E3%2582%25B7%25E3%2583%25A5%25E3%2583%259C%25E3%2583%25BC%25E3%2583%2589/&xid=17259,15700022,15700186,15700191,15700253,15700256,15700259&usg=ALkJrhj0-o62mgfnd9aE6D2AAmTT_jAHbw)\)
- [Open Source Developer Podcast episode](https://anchor.fm/opensourcedeveloperpod/episodes/The-Razzle-Dazzle-of-RasDash-e3vqee) (Thank you so much, [@perkinsjr](https://github.com/perkinsjr)!)

<br>

### Guidelines

If you want to submit code, write an issue/pull request, or comment, you should read these documents first:
- [Code of Conduct](https://github.com/sykeben/RasDash/blob/master/CODE_OF_CONDUCT.md)
- [Contribution Guidelines](https://github.com/sykeben/RasDash/blob/master/CONTRIBUTING.md)
- [Code License](https://github.com/sykeben/RasDash/blob/master/LICENSE)  

By reading these docs, it makes it easier for you (and me) to work on issues, changes, and more.
