#include <linux/module.h> /* Needed by all modules */
#include <linux/kernel.h> /* Needed for KERN_INFO */
#include <linux/fs.h>  /* for the fs */
#include <linux/init.h>      /* __init and __exit macros */
#include <asm/uaccess.h>  /* for put_user */

MODULE_LICENSE("GPL");
MODULE_AUTHOR("SebastianAudet");
MODULE_DESCRIPTION("A Simple Hello World module");

/*  
 *  This module uses /dev/testdevice.  The MODULE_SUPPORTED_DEVICE macro might
 *  be used in the future to help automatic configuration of modules, but is 
 *  currently unused other than for documentation purposes.
 */
//MODULE_SUPPORTED_DEVICE("testdevice");

#define SUCCESS 0
#define DEVICE_NAME "helloworlddev" /* Dev name as it appears in /proc/devices   */
#define BUF_LEN 80    /* Max length of the message from the device */

static int h_device_open(struct inode *, struct file *);
static int h_device_release(struct inode *, struct file *);
static ssize_t h_device_read(struct file *, char *, size_t, loff_t *);
static ssize_t h_device_write(struct file *, const char *, size_t, loff_t *);

static int Major;   /* Major number assigned to our device driver */
static int Device_Open = 0; /* Is device open?  
         * Used to prevent multiple access to device */
static char msg[BUF_LEN]; /* The msg the device will give when asked */
static char *msg_Ptr;

static struct file_operations fops = {
  .read = h_device_read,
  .write = h_device_write,
  .open = h_device_open,
  .release = h_device_release
};

static int __init hello_start(void)
{
  printk(KERN_INFO "Hello world! From Sebastian in the kernel 1.\n");
  
  Major = register_chrdev(0, DEVICE_NAME, &fops);

  if (Major < 0) {
    printk(KERN_ALERT "Registering char device failed with %d\n", Major);
    return Major;
  }

  printk(KERN_INFO "I was assigned major number %d. To talk to\n", Major);
  printk(KERN_INFO "the driver, create a dev file with\n");
  printk(KERN_INFO "'mknod /dev/%s c %d 0'.\n", DEVICE_NAME, Major);
  printk(KERN_INFO "Try various minor numbers. Try to cat and echo to\n");
  printk(KERN_INFO "the device file.\n");
  printk(KERN_INFO "Remove the device file and module when done.\n");

  return SUCCESS;

  /* 
   * A non 0 return means init_module failed; module can't be loaded. 
   */
  return 0;
}

static void __exit hello_stop(void)
{
  
  /* int ret; */
  unregister_chrdev(Major, DEVICE_NAME);
  
  printk(KERN_INFO "Goodbye world! From Sebastian in the kernel 1.\n");
  
  /* if (ret < 0) */
  /*   printk(KERN_ALERT "Error in unregister_chrdev: %d\n", ret); */
}

/*
 * Methods
 */

/* 
 * Called when a process tries to open the device file, like
 * "cat /dev/mycharfile"
 */
static int h_device_open(struct inode *inode, struct file *file)
{
  static int counter = 0;

  if (Device_Open)
    return -EBUSY;

  Device_Open++;
  sprintf(msg, "I already told you %d times Hello world!\n", counter++);
  msg_Ptr = msg;
  try_module_get(THIS_MODULE);

  return SUCCESS;
}

/* 
 * Called when a process closes the device file.
 */
static int h_device_release(struct inode *inode, struct file *file)
{
  Device_Open--;    /* We're now ready for our next caller */

  /* 
   * Decrement the usage count, or else once you opened the file, you'll
   * never get get rid of the module. 
   */
  module_put(THIS_MODULE);

  return 0;
}

/* 
 * Called when a process, which already opened the dev file, attempts to
 * read from it.
 */
static ssize_t h_device_read(struct file *filp, /* see include/linux/fs.h   */
         char *buffer,  /* buffer to fill with data */
         size_t length, /* length of the buffer     */
         loff_t * offset)
{
  /*
   * Number of bytes actually written to the buffer 
   */
  int bytes_read = 0;

  /*
   * If we're at the end of the message, 
   * return 0 signifying end of file 
   */
  if (*msg_Ptr == 0)
    return 0;

  /* 
   * Actually put the data into the buffer 
   */
  while (length && *msg_Ptr) {

    /* 
     * The buffer is in the user data segment, not the kernel 
     * segment so "*" assignment won't work.  We have to use 
     * put_user which copies data from the kernel data segment to
     * the user data segment. 
     */
    put_user(*(msg_Ptr++), buffer++);

    length--;
    bytes_read++;
  }

  /* 
   * Most read functions return the number of bytes put into the buffer
   */
  return bytes_read;
}

/*  
 * Called when a process writes to dev file: echo "hi" > /dev/hello 
 */
static ssize_t
h_device_write(struct file *filp, const char *buff, size_t len, loff_t * off)
{
  printk(KERN_ALERT "Sorry, this operation isn't supported.\n");
  return -EINVAL;
}

//required for the above to work
module_init(hello_start);
module_exit(hello_stop);
