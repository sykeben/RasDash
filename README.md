# [RasDash](https://sykeben.github.io/RasDash)
A Raspberry Pi dashboard built on NodeJS.

<br>

### Statuses
| Service   | Status |
|-----------|--------|
| Live Demo | ![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge) |

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
