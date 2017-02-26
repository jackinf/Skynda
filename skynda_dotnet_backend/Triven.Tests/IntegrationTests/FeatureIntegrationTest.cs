using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Domain.ViewModels.Feature;
using Triven.Tests.Utils;

namespace Triven.Tests.IntegrationTests
{
    public class FeatureIntegrationTest : IntegrationTestBase
    {
        [Test]
        public void Simple()
        {
            Assert.IsTrue(true);
        }

        [Test]
        public void should_create_read_update_delete_feature()
        {
            ClearTable(Context.Features);

            const string const_name = "name123";
            const string const_name_updated = "name123_updated";
            const string const_description = "desc123";
            const int const_weight = 10;
            const string const_value = "value123";

            var feature = new FeatureViewModel
            {
                Name = const_name,
                Description = const_description,
                Weight = const_weight,
                Value = const_value,
            };

            var featureController = new FeatureController();
            int featureId;

            {
                //
                // Create
                //
                var addResult = featureController.Add(feature) as OkNegotiatedContentResult<object>;
                Assert.IsNotNull(addResult, "Creatae. Response was not ok or invalid type was supplied");
                var addViewModelResult = addResult.Content as FeatureViewModel;
                Assert.IsNotNull(addViewModelResult, "Create. Invalid return type");
                Assert.AreEqual(const_name, addViewModelResult.Name);
                Assert.AreEqual(const_description, addViewModelResult.Description);
                Assert.AreEqual(const_weight, addViewModelResult.Weight);
                Assert.AreEqual(const_value, addViewModelResult.Value);
                featureId = addViewModelResult.Id;
            }

            {
                //
                // Update
                //
                feature.Name = const_name_updated;
                var updateResult = featureController.Update(featureId, feature) as OkNegotiatedContentResult<object>;
                Assert.IsNotNull(updateResult, "Update. Response was not ok or invalid type was supplied");
                var updateViewModelResult = updateResult.Content as FeatureViewModel;
                Assert.IsNotNull(updateViewModelResult, "Invalid return type");
                Assert.AreEqual(const_name_updated, updateViewModelResult.Name);
                Assert.AreEqual(const_description, updateViewModelResult.Description);
                Assert.AreEqual(const_weight, updateViewModelResult.Weight);
                Assert.AreEqual(const_value, updateViewModelResult.Value);
            }

            {
                //
                // Get
                //
                var getResult = featureController.Get(featureId) as OkNegotiatedContentResult<object>;
                Assert.IsNotNull(getResult, "Get. Response was not ok or invalid type was supplied");
                var getViewModelResult = getResult.Content as FeatureViewModel;
                Assert.IsNotNull(getViewModelResult, "Get. Invalid return type");
                Assert.AreEqual(const_name_updated, getViewModelResult.Name);
                Assert.AreEqual(const_description, getViewModelResult.Description);
                Assert.AreEqual(const_weight, getViewModelResult.Weight);
                Assert.AreEqual(const_value, getViewModelResult.Value);
            }

            {
                //
                // GetAll
                //
                var getAllResult = featureController.GetAll() as OkNegotiatedContentResult<object>;
                Assert.IsNotNull(getAllResult, "Get all. Response was not ok or invalid type was supplied");
                var getAllViewModelResults = getAllResult.Content as IList<FeatureViewModel>;
                Assert.IsNotNull(getAllViewModelResults, "Invalid return type");
                Assert.AreEqual(1, getAllViewModelResults.Count);
                Assert.AreEqual(const_name_updated, getAllViewModelResults[0].Name);
                Assert.AreEqual(const_description, getAllViewModelResults[0].Description);
                Assert.AreEqual(const_weight, getAllViewModelResults[0].Weight);
                Assert.AreEqual(const_value, getAllViewModelResults[0].Value);
            }

            {
                //
                // Delete
                //
                var deleteResult = featureController.Delete(featureId) as OkNegotiatedContentResult<object>;
                Assert.IsNotNull(deleteResult, "Delete. Response was not ok or invalid type was supplied");
                Assert.AreEqual(0, Context.Features.Count(x => x.IsActive));
            }
        }
    }
}