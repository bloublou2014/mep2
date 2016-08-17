#include "ModbusDriverBinder.h"

ModbusDriverBinder::ModbusDriverBinder(Callback *progress, Callback *callback) {
    modbusClient = ModbusClientSW::getModbusClientInstance();
    Nan::AsyncQueueWorker(new ModbusDataListenerWorker(callback, progress));
}

ModbusDriverBinder::~ModbusDriverBinder() {
    modbusClient->stop();
}

void ModbusDriverBinder::registerCoilReading(unsigned char slaveAddress, short functionAddress) {
    int modbusID = modbusClient->registerCoilReading(slaveAddress, functionAddress, false);
    modbusClient->setReading(modbusID, true);
}

void ModbusDriverBinder::registerCoilReadingFunction(const Nan::FunctionCallbackInfo<Value> &args) {
    Nan::HandleScope scope;

    // Get params
    if (args.Length() != 2 ||
        args[0]->IsInt32() == false ||
        args[1]->IsInt32() == false) {

        args.GetIsolate()->ThrowException(Exception::TypeError(
            Nan::New("Please check arguments").ToLocalChecked()
        ));
    }

    unsigned char slaveAddress = (unsigned char)args[0]->Int32Value();
    short functionAddress = (short)args[1]->Int32Value();

    ModbusDriverBinder *modbusDriver = ObjectWrap::Unwrap<ModbusDriverBinder>(args.Holder());
    modbusDriver->registerCoilReading(slaveAddress, functionAddress);
}

void ModbusDriverBinder::Init(Local<Object> exports) {
    Nan::HandleScope scope;

    Local<FunctionTemplate> tmpl = Nan::New<FunctionTemplate>(New);
    tmpl->InstanceTemplate()->SetInternalFieldCount(1);

    Nan::SetPrototypeMethod(tmpl, "registerCoilReading", registerCoilReadingFunction);

    exports->Set(Nan::New("ModbusDriverBinder").ToLocalChecked(), tmpl->GetFunction());
}

void ModbusDriverBinder::New(const Nan::FunctionCallbackInfo<Value> &args) {
    Nan::HandleScope scope;

    if (args.Length() != 2 ||
        args[0]->IsFunction() == false ||
        args[1]->IsFunction() == false) {

        args.GetIsolate()->ThrowException(Exception::TypeError(
            Nan::New("Please check arguments").ToLocalChecked()
        ));
    }


    Callback *progress = new Callback(args[0].As<v8::Function>());
    Callback *callback = new Callback(args[1].As<v8::Function>());

    ModbusDriverBinder *modbusDriverBinder = new ModbusDriverBinder(callback, progress);
    modbusDriverBinder->Wrap(args.This());


    // Return object
    args.GetReturnValue().Set(args.This());
}
