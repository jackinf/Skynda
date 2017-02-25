namespace Triven.Domain.Constants
{
    public enum Status
    {
        /// <summary>
        /// Not selected
        /// </summary>
        NotSelected = 0,
        /// <summary>
        /// Active
        /// </summary>
        Active = 1,
        /// <summary>
        /// In active
        /// </summary>
        InActive = 2,
        /// <summary>
        /// Deleted 
        /// </summary>
        Deleted = 3
    }

    public enum ContactInfoType
    {
        /// <summary>
        /// Not selected
        /// </summary>
        NotSelected = 0,

        /// <summary>
        /// Home contact info
        /// </summary>
        Home = 1,

        /// <summary>
        /// Work contact info
        /// </summary>
        Work = 2,
    }

    public enum VehiceType
    {
        /// <summary>
        /// Not selected
        /// </summary>
        NotSelected = 0,

        /// <summary>
        /// Taxi
        /// </summary>
        Taxi = 1,

        /// <summary>
        /// Van
        /// </summary>
        Van = 2,

        /// <summary>
        /// Lorry
        /// </summary>
        Lorry = 3,

        /// <summary>
        /// Truck + Trailer
        /// </summary>
        TruckTrailer = 4,

        /// <summary>
        /// RoadTrain
        /// </summary>
        RoadTrain = 5,

        /// <summary>
        /// Ferry
        /// </summary>
        Ferry = 6,

        /// <summary>
        /// Train
        /// </summary>
        Train = 7,

        /// <summary>
        /// Airplane
        /// </summary>
        Airplane = 8
    }
}
