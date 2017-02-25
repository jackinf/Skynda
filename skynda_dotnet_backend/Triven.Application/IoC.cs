using Ninject;

namespace X3Project.Application
{
    public class IoC
    {
        /// <summary>
        /// Main Ninject Kernel, which holds interface and implementation pair definitions.
        /// </summary>
        public static IKernel Kernel { get; set; }
        
        /// <summary>
        /// Get implementation by interface. For example if we ask for implementation of ITodoModel, we will get TodoModel if we defined this pair.
        /// </summary>
        /// <typeparam name="T">Type which we use to find implementation by</typeparam>
        /// <returns></returns>
        public static T Get<T>() => Kernel.Get<T>();
    }
}