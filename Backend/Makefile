CC = gcc
CFLAGS = -Iinclude -Wall -O2
OBJDIR = build
BINDIR = cgi-bin
TARGET = $(BINDIR)\app.cgi

SRC = src\main.c src\product.c src\customer.c src\admin.c src\store.c
OBJ = $(OBJDIR)\main.o $(OBJDIR)\product.o $(OBJDIR)\customer.o $(OBJDIR)\admin.o $(OBJDIR)\store.o

# Default target
all: dirs $(TARGET)

# Link step
$(TARGET): $(OBJ)
	$(CC) -o $@ $^

# Compile step
$(OBJDIR)\%.o: src\%.c
	$(CC) $(CFLAGS) -c $< -o $@

# Create directories if not exist
dirs:
	@if not exist $(OBJDIR) mkdir $(OBJDIR)
	@if not exist $(BINDIR) mkdir $(BINDIR)

# Clean build files (safe for Windows)
clean:
	@if exist $(OBJDIR)\*.o del /Q $(OBJDIR)\*.o
	@if exist $(TARGET) del /Q $(TARGET)
