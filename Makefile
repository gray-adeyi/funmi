build: build-linux build-macos build-windows

build-linux:
	echo "building for linux..."
	GOOS=linux GOARCH=amd64 wails build
build-macos:
	echo "building for macos..."
	GOOS=darwin GOARCH=amd64 wails build
build-windows:
	echo "building for windows..."
	wails build -nsis

