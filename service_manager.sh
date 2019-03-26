
#!/bin/bash

if [ "$1" = "install" ]
then
    echo "Adding RasDash service to systemctl..."
    sudo cp RasDash.service /etc/systemd/system/RasDash.service
    sudo systemctl enable RasDash.service
    echo "Done."
elif [ "$1" = "start" ]
then
    echo "Starting RasDash service..."
    sudo systemctl start RasDash.service
elif [ "$1" = "stop" ]
then
    echo "Stopping RasDash service..."
    sudo systemctl stop RasDash.service
elif [ "$1" = "enable" ]
then
    echo "Enabling RasDash service to start on boot..."
    sudo systemctl enable RasDash.service
elif [ "$1" = "disable" ]
then
    echo "Disabling RasDash service from starting on boot..."
    sudo systemctl disable RasDash.service
elif [ "$1" = "uninstall" ]
then
    echo "Removing RasDash service from systemctl..."
    sudo systemctl stop RasDash.service
    sudo systemctl disable RasDash.service
    sudo rm -f /etc/systemd/system/RasDash.service
    sudo systemctl daemon-reload
elif [ "$1" = "help" ]
then
    echo ""
    echo "./service_manager.sh argument"
    echo ""
    echo "install - installs RasDash service and enables start on boot"
    echo "start - starts RasDash via systemctl (service must be installed)"
    echo "stop - stops RasDash via systemctl (service must be installed)"
    echo "enable - enables RasDash to start on boot (service must be installed)"
    echo "disable - disables RasDash from starting on boot (service must be installed)"
    echo "uninstall - completely removes RasDash service from systemctl"
    echo ""
else
    echo "Invalid option. Options are help, install, uninstall, enable, disable, start, stop."
fi
