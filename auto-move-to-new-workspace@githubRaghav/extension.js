const { Meta, GLib } = imports.gi;

import Shell from 'gi://Shell';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class newWorkspaceExtension extends Extension {
    enable() {
        this._windowCreatedId = global.display.connect(
            'window-created', (dpy, window) => {
                if (window.window_type !== Meta.WindowType.NORMAL)
                    return;

                GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
                    let workspaceManager = global.workspace_manager;

                    // Ensure there's more than one workspace
                    if (workspaceManager.get_n_workspaces() === 1) {
                        workspaceManager.append_new_workspace(false, global.get_current_time());
                    }

                    let lastIndex = workspaceManager.get_n_workspaces() - 1;
                    let ws = workspaceManager.get_workspace_by_index(lastIndex);
                    window.change_workspace(ws);
                    ws.activate_with_focus(window, global.get_current_time());

                    return GLib.SOURCE_REMOVE;
                });
            });
    }

    disable() {
        if (this._windowCreatedId > 0) {
            global.display.disconnect(this._windowCreatedId);
            this._windowCreatedId = 0;
        }
    }
}

