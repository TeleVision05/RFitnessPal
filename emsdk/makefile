EMCC = emcc
CXXFLAGS = -O3
TARGET = public/program.js
SOURCES = ../src/test.cpp

EM_FLAGS = \
  -s MODULARIZE=1 \
  -s EXPORT_NAME='createMyModule' \
  -s ENVIRONMENT='web,worker' \
  -s EXPORTED_FUNCTIONS='["_processArgs"]' \
  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap", "UTF8ToString"]' \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s WASM=1 \
  -s SINGLE_FILE=1 \
  -s EXPORT_ES6=1 \
  --no-entry

all: $(TARGET)

$(TARGET): $(SOURCES)
	@mkdir -p public
	$(EMCC) $(CXXFLAGS) $^ -o $@ $(EM_FLAGS)

clean:
	rm -f $(TARGET)