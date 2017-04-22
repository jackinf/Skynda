using System;

namespace Triven.Domain.Exceptions
{
    public class VehicleNotFoundException : Exception
    {
        public VehicleNotFoundException(int vehicleId) : base("Vehicle was not found with id " + vehicleId) {}
    }
}