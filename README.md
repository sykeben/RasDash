# RasDash
A Raspberry Pi dashboard built on NodeJS.

<br>

### Build Status
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
