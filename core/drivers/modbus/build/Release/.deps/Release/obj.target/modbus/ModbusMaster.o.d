cmd_Release/obj.target/modbus/ModbusMaster.o := g++ '-DNODE_GYP_MODULE_NAME=modbus' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DBUILDING_NODE_EXTENSION' -I/home/lukicdarkoo/.node-gyp/6.3.0/include/node -I/home/lukicdarkoo/.node-gyp/6.3.0/src -I/home/lukicdarkoo/.node-gyp/6.3.0/deps/uv/include -I/home/lukicdarkoo/.node-gyp/6.3.0/deps/v8/include -I../../../../node_modules/nan  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -O3 -fno-omit-frame-pointer -fno-rtti -fno-exceptions -std=gnu++0x -std=c++11 -fexceptions -MMD -MF ./Release/.deps/Release/obj.target/modbus/ModbusMaster.o.d.raw   -c -o Release/obj.target/modbus/ModbusMaster.o ../ModbusMaster.cpp
Release/obj.target/modbus/ModbusMaster.o: ../ModbusMaster.cpp \
 ../ModbusMaster.h ../rs485.h
../ModbusMaster.cpp:
../ModbusMaster.h:
../rs485.h: