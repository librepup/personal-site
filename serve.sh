#!/usr/bin/env -S guix shell python -- sh

# Start Python Web-Server
startPythonFunc() {
    python3 -m http.server 9956 &>/dev/null &
    echo "[ Success ]: Started Python(3) Server (http://0.0.0.0:9956/)"
}

# Kill Python Optional
killPythonFunc() {
    pkill python &>/dev/null &
    pkill python3 &>/dev/null &
    echo "[ Success ]: Killed Python(3)"
}

statusPythonFunc() {
    if pgrep -x python >/dev/null || pgrep -x python3 >/dev/null; then
        echo "[ Status ]: Python(3) Server is Running"
    else
        echo "[ Status ]: Python(3) Server is NOT Running"
    fi
}

# Open In Browser Optional
openInBrowserFunc() {
    echo "[ Success ]: Opening in Browser(http://0.0.0.0:9956/)"
    xdg-open http://0.0.0.0:9956/ &>/dev/null &
}

case "$1" in
    k|kill)
        killPythonFunc
        ;;
    o|open|b|browser)
        openInBrowserFunc
        ;;
    start|r|run)
        startPythonFunc
        ;;
    s|status)
        statusPythonFunc
        ;;
    ""|*)
        python3 -m http.server 9956
        pkill python
        pkill python3
        ;;
esac
