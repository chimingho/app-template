using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTest_NetFramework472
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
