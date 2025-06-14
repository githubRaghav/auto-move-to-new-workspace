#!/bin/bash
set -e
echo "Packing extension ..."
gnome-extensions pack auto-move-to-new-workspace@githubRaghav \
	--force \
	--extra-source="../LICENSE" 
echo "Packing done!"
gnome-extensions install --force auto-move-to-new-workspace@raghav.shell-extension.zip
