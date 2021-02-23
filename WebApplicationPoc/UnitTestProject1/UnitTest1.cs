using Microsoft.VisualStudio.TestTools.UnitTesting;

using WebApplicationCEF6.Controllers;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var expected = 1;
            var actual = WebApplicationCEF6.Controllers.ValuesController.Test(expected);
            Assert.IsTrue(expected == actual);

        }
    }
}
