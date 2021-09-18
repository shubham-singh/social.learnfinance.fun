const Acquaintance = ({followingCount, followerCount}: {followingCount: number, followerCount: number}) => {
    return (
        <div className="flex flex-row">
            <p className="mr-7">
              <span className="font-bold">
                {followingCount}
              </span>{" "}
              Following
            </p>
            <p>
              <span className="font-bold">
                {followerCount}
              </span>{" "}
              Followers
            </p>
          </div>
    );
}

export default Acquaintance;